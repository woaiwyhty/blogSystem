# blogSystem
blog system built by MEAN stack tools

APIList:
[Method] [Name] [Parameter] [Return Value]

retCode meanings:
0: success

1. [GET] [login] [No Parameter]
2. [POST] [login] [{username: u, password: p}]
3. [GET] [register] [No Parameter]
4. [POST] [register] [{username: u, password: p, email: xxx@xx.xx, birthday: year/month/day}]
5. [GET] [section] [No Parameter]
6. [POST] [section] [{sectionName: name}] -> add a new section(only admin user can use this api)
7. [GET] [thread] [id=threadID] [{threadTitle,,threadContent,threadDate,userName,sectionName,sectionId}]
8. [POST] [thread] [{title: t, content: balabalabala, sectionID: balabalabala}]