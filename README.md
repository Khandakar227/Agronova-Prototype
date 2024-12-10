# Krishi Dishari

## Installation
`python version: 3.10`
Go to `backend`. create a virtual environment.\

```bash
python -m venv venv
```
Activate the environment (For Windows).
```bash
venv/Scripts/activate
```
Install fastapi:
```bash
pip install fastapi[standard]
```
Install all the python packages.
```bash
pip install -r requirements.txt
```

Run the backend:
```bash
fastapi dev main.py
```

### Add the Model weights
Download the [ZIP](https://drive.google.com/file/d/16tueh_67HojvjO0A6mZ45JvW_Ig9vovg/view?usp=drive_link) file and extract it to `backend/weights` folder.
