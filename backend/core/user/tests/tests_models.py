import pytest

from core.user.models import User


data_user = {
  "username": "test",
  "email": "test@email.com",
  "first_name": "Test",
  "last_name": "User",
  "password": "staff123"
}

@pytest.mark.django_db
def test_create_user():
    user = User.objects.create_user(**data_user)
    assert user.username == data_user['username']
    assert user.email == data_user['email']
    assert user.first_name == data_user['first_name']
    assert user.last_name == data_user['last_name']

data_superuser = {
    "username": "test_superuser",
    "email": "testsuperuser@email.com",
    "first_name": "Test",
    "last_name": "Superuser",
    "password": "admin123"
}

@pytest.mark.django_db
def test_create_superuser():
    user = User.objects.create_superuser(**data_superuser)
    assert user.username == data_superuser['username']
    assert user.email == data_superuser['email']
    assert user.first_name == data_superuser['first_name']
    assert user.last_name == data_superuser['last_name']
    assert user.is_superuser == True
    assert user.is_staff == True
