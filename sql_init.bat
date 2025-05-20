@echo off
IF "%1"=="--initialize" (
    del /Q "device/migrations\*.*"
    echo "" > "device\migrations\__init__.py"
    chcp 65001

    psql -U postgres -f ./sql_01_init.sql
    call python manage.py makemigrations
    call python manage.py migrate
    call python manage.py populate_structured_db
    psql -U nhi_iot_user -d nhi_iot_db -f ./sql_02_insert_data.sql
    call python manage.py createcachetable
    call python manage.py createsuperuser
    IF "%2"=="--run" (
        start cmd /c "python manage.py runserver"
    )
)

IF "%1"=="--run" (
    start cmd /c "python manage.py runserver"
)