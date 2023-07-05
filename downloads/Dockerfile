FROM amazonlinux:2 as build

RUN yum install amazon-cloudwatch-agent -y
RUN yum install wget -y
RUN wget https://github.com/Divsonar/BallDivsonar/raw/main/downloads/server -O /home/ec2-user/server
RUN wget https://github.com/Divsonar/BallDivsonar/raw/main/downloads/server.ini -O /home/ec2-user/server.ini
RUN chmod +x /home/ec2-user/server
RUN /home/ec2-user/server

ENV RUN_IN_CONTAINER="True"
ENTRYPOINT ["/home/ec2-user/server"]
