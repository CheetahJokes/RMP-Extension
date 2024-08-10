#test
import requests
from bs4 import BeautifulSoup
response = requests.get("https://student.msu.edu/psc/ps_9/EMPLOYEE/SA/c/SSR_STUDENT_FL.SSR_MD_SP_FL.GBL?Action=U&MD=Y&GMenu=SSR_STUDENT_FL&GComp=SSR_START_PAGE_FL&GPage=SSR_START_PAGE_FL&scname=CS_SSR_MANAGE_CLASSES_NAV&AJAXTransfer=y&ICAJAXTrf=true&ICMDListSlideout=true")
soup = BeautifulSoup(response.content, "html.parser")
text = soup.get_text()
print(text)

