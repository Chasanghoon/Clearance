

## **가상 환경 설정**

```powershell
# 가상 환경 폴더 생성
python -m venv venv

# 가상 환경 활성화
source venv/Scripts/activate

```



## **flask 환경 설정**

```powershell
#flask 설치
pip install flask

#필요한 flask 라이브러리 설치 후 requirements.txt 기록
pip freeze > requirements.txt

# requirements.txt에 기록된 라이브러리 설치
pip install -r requirements.txt
```

