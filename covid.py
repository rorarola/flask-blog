import requests
from bs4 import BeautifulSoup
import re

def get_covid_info():
    response = requests.get("https://www.cdc.gov.tw/Category/NewsPage/EmXemht4IT-IRAPrAnyG9A")
    soup = BeautifulSoup(response.text, "html.parser")
    data = soup.find(text=re.compile('新增')).parent.parent.parent
    data_str = data.get_text()
    #print(data_str)


    caseRegex = re.compile('新增[0-9,]+例')
    str = caseRegex.findall(data_str)[0]
    #print(str)
    covid_case_str = ''.join(n for n in str if n.isdigit())
    covid_case = int(covid_case_str)
    print(covid_case)

    dateRegex = re.compile('[0-9]+/[0-9]+/[0-9]+')
    date = dateRegex.findall(data_str)[0]
    print(date)
    return {"date": date, "case": covid_case}
