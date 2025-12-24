@echo off
echo Starting Banking Fintech Backend...

if not exist target\banking-0.0.1-SNAPSHOT.jar (
    echo Jar file not found. Building project...
    call mvn clean package -DskipTests
)

echo Launching Application...
java -jar target\banking-0.0.1-SNAPSHOT.jar
