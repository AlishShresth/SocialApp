import pytest
from rest_framework import status

from core.fixtures.user import user


class TestAuthenticationViewSet:
    endpoint = '/api/auth/'
    