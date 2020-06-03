# Documentation

## Models
- Token
{
  "token": "",
}

- Group
{
  "name":""
}
- Member
{
  "name":"",
  "group":"" > Group._id,
  "token":"" > Token.token,
  "auth": [
    'member' //group_leader, admin
  ]
}
- Profile
{
  "memberId":"",
  
}
## Routes
