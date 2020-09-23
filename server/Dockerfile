FROM python:3.7
WORKDIR /server
COPY . .
RUN python3 -m pip install -r requirements.txt
EXPOSE 3000
CMD ["python3", "server.py"]