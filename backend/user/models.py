from flask import Flask, request


class User:
    def signUp(self):
        # get user data from response form
        user = request.get_json()
        return user
