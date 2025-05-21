
from django.db import connection

if __name__ == '__main__':
    with connection.cursor() as c:
        c.execute(
            """
        INSERT INTO active_program(iot_device,start_time,program) VALUES
        (1,2,3),
        (1,2,3);
        """,
            [],
        )
