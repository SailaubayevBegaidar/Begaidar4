# Менеджер Задач с JWT Аутентификацией

## Обзор

Это веб-приложение, разработанное на JavaScript, использующее JWT токены для безопасной аутентификации. Проект предоставляет API для управления задачами и аутентификации пользователей.

## Основные возможности

- Регистрация и вход пользователей с JWT аутентификацией
- Управление задачами (создание, просмотр, обновление, удаление)
- Защищенные эндпоинты с middleware аутентификацией

## Установка

Для локальной установки выполните следующие шаги:

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/SailaubayevBegaidar/Begaidar4.git
   ```

2. Перейдите в директорию проекта:
   ```bash
   cd Begaidar4
   ```

3. Установите зависимости:
   ```bash
   npm install
   ```

4. Запустите проект:
   ```bash
   npm start
   ```

## API Endpoints

### Пользовательские эндпоинты

- **Регистрация**: `POST /users/register`
  ```json
  {
    "userName": "ваше_имя",
    "userEmail": "ваша_почта",
    "userPassword": "ваш_пароль"
  }
  ```

- **Вход**: `POST /users/login`
  ```json
  {
    "email": "ваш_email",
    "password": "ваш_пароль"
  }
  ```

### Эндпоинты задач (требуют JWT аутентификации)

- **Создание задачи**: `POST /tasks/create`
  - Headers: `Authorization: Bearer <jwt_token>`
  - Body:
    ```json
    {
      "taskName": "Название задачи",
      "taskContent": "Описание задачи"
    }
    ```

- **Получение всех задач**: `GET /tasks`
  - Headers: `Authorization: Bearer <jwt_token>`

- **Получение задачи по ID**: `GET /tasks/:id`
  - Headers: `Authorization: Bearer <jwt_token>`

- **Обновление задачи**: `PUT /tasks/update/:id`
  - Headers: `Authorization: Bearer <jwt_token>`
  - Body:
    ```json
    {
      "title": "Обновленное название",
      "description": "Обновленное описание"
    }
    ```

- **Удаление задачи**: `DELETE /tasks/delete/:id`
  - Headers: `Authorization: Bearer <jwt_token>`

## Контакты

По вопросам и предложениям:
- GitHub: [SailaubayevBegaidar](https://github.com/SailaubayevBegaidar)