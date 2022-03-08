FROM mcr.microsoft.com/playwright/java:v1.18.0-focal

ARG SCRATCH_DIR=/opt/app

RUN mkdir ${SCRATCH_DIR}
RUN mkdir ./build
RUN mkdir ./de
RUN mkdir ./de/gcp

COPY src/ src/
COPY gradle/ gradle/
COPY build.gradle gradlew ./
COPY gradle/build-init.gradle /opt/app
COPY settings.gradle ./

RUN ./gradlew build

RUN cp -r /build/libs/* /opt/app
RUN rm -rf /opt/app/*/build/libs/

ENTRYPOINT [ "/usr/bin/java", "-cp", "/opt/app/*", "de.gcp.PubSubApplication" ]
