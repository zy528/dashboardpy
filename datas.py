from django.db import connection

class GetData():
    cursor = connection.cursor()
    def getuser(self):
        self.cursor.execute("select * from z_user")
        result = self.cursor.fetchall()
        return result