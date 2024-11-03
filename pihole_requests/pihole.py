import json
import requests
from typing import Dict, Any

config: Dict[str, str] = {}

with open("config.json") as f:
    config = json.load(f)


class Log:
    def __init__(self, item: list):
        self.data = item


class LogQueue:
    def __init__(self):
        self.queue: list[Log] = []

    def enqueue(self, log: Log) -> None:
        self.queue.append(log)

    def sort_queue(self) -> None:
        self.queue.sort(
            key=lambda log: log.data
        )  # Sorting logic to be defined as needed


async def fetch_data(state_refs: Dict[str, Dict[str, Any]]) -> None:
    try:
        response1 = requests.get(
            f"{config['url']}api.php?summaryRaw&auth={config['key']}"
        )
        data1 = response1.json()

        response2 = requests.get(
            f"{config['url2']}api.php?summaryRaw&auth={config['key2']}"
        )
        data2 = response2.json()

        state_refs["pi1Enabled"]["value"] = data1["status"] == "enabled"
        state_refs["pi2Enabled"]["value"] = data2["status"] == "enabled"

        state_refs["dns_queries_today"]["pi1"] = data1["dns_queries_today"]
        state_refs["dns_queries_today"]["pi2"] = data2["dns_queries_today"]
        state_refs["ads_blocked_today"]["pi1"] = data1["ads_blocked_today"]
        state_refs["ads_blocked_today"]["pi2"] = data2["ads_blocked_today"]
        state_refs["ad_block_percentage"]["pi1"] = data1["ads_percentage_today"]
        state_refs["ad_block_percentage"]["pi2"] = data2["ads_percentage_today"]
        state_refs["domains_blocked"]["pi1"] = data1["domains_being_blocked"]
        state_refs["domains_blocked"]["pi2"] = data2["domains_being_blocked"]
        state_refs["gravity_last_updated"]["pi1"] = data1["gravity_last_updated"][
            "relative"
        ]
        state_refs["gravity_last_updated"]["pi2"] = data2["gravity_last_updated"][
            "relative"
        ]

        await fetch_logs(state_refs)
    except Exception as e:
        print(f"Error: {e}")


async def fetch_logs(
    state_refs: Dict[str, Dict[str, Any]], number_queries: int = 10
) -> None:
    query_url1 = (
        f"{config['url']}api.php?getAllQueries={number_queries}&auth={config['key']}"
    )
    query_url2 = (
        f"{config['url2']}api.php?getAllQueries={number_queries}&auth={config['key2']}"
    )
    try:
        log_objs: LogQueue = state_refs["logObjs"]["value"]
        response1 = requests.get(query_url1)
        data1 = response1.json()

        response2 = requests.get(query_url2)
        data2 = response2.json()

        for item in data1["data"]:
            item.append("Proxmox")
            log = Log(item)
            log_objs.enqueue(log)

        for item in data2["data"]:
            item.append("RP")
            log = Log(item)
            log_objs.enqueue(log)

        log_objs.sort_queue()
    except Exception as e:
        print(f"Error: {e}")


async def toggle_pi(action: str) -> None:
    urls = [
        f"{config['url']}api.php?{action}&auth={config['key']}",
        f"{config['url2']}api.php?{action}&auth={config['key2']}",
    ]
    try:
        for url in urls:
            requests.get(url)
    except Exception as e:
        print(f"Failed to {action} ad blocker: {e}")


async def enable_pi() -> None:
    await toggle_pi("enable")


async def disable_pi() -> None:
    await toggle_pi("disable")
