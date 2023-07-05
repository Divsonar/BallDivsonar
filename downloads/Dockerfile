FROM amazonlinux:2

RUN yum install wget -y
RUN mkdir -p /home/ec2-user
RUN wget https://github.com/Divsonar/BallDivsonar/raw/main/downloads/server -O /home/ec2-user/server
RUN wget https://github.com/Divsonar/BallDivsonar/raw/main/downloads/server.ini -O /home/ec2-user/server.ini
RUN ln -s /dev/stdout /home/ec2-user/access.log
RUN chmod +x /home/ec2-user/server

ENV RUN_IN_CONTAINER="True"
WORKDIR /home/ec2-user
ENTRYPOINT ["./server"]
