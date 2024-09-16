## Local Development

Copy file `.env.example` to `.env` and adjust configuration.

Run:

```bash
docker compose up -d --build
```

### VS Code

Install venv:

```bash
cd services/backend
python -m venv .venv
source .venv/bin/activate
pip install -r ./requirements.txt
```

Run command in VS Code (Press F1): `Python: Select Interpreter`

Enter: `./services/backend/.venv/bin/python`


### Database Migrations

```sh
./scripts/dbmate.sh --help
```
