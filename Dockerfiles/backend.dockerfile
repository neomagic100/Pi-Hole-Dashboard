FROM python:latest

# RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

WORKDIR /usr/src/app

COPY requirements.txt ./

# RUN python3 -m venv venv

# RUN . venv/bin/activate

RUN pip install -r requirements.txt

# RUN apt-get install -y python3-fastapi python3-uvicorn

COPY . .

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
