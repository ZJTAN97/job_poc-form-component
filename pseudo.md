

# Creating a new record


## String, Object

content = get("fieldname.attribute")

## Array of objects

Loop through the above

## String array

1. On creating a new string, insert an "empty" soi; where the content is the index of the new element
2. On submission 
  - index = soi.content
  - content = get("fieldname[index])")

To take care of:
- "reindexing" when elements are removed 


Pure functions:
- Get value by fieldname (both fieldname and dot notation and index)
- Get all soi by field (e.g. all "skills" soi)
- Reindexing the soi array after an element is removed


company_name = "cn"
skill = [0, 1, 2, 3, 4, 5]


SOIs: [1, 2, "cn"]

SOIs: [{
    field: "skills",
    content: "0",
    soi: null
},
{
    field: "skills",
    content: "1",
    soi: null
},
{
    field: "skills",
    content: "2",
    soi: null
},{
    field: "company_name",
    content: "",
    soi: null
},]



## PUT

company_name = "cn"
skill = [skill1, skill2, skill3]


SOIs: [1, 2, "cn"]

SOIs: [{
    field: "skills",
    content: "skill1" --> "0",
    soi: null
},
{
    field: "skills",
    content: "skill2" --> "1",
    soi: null
},
{
    field: "skills",
    content: "skill3" --> "2",
    soi: null
},{
    field: "company_name",
    content: "",
    soi: null
},]



## ZJ VERSION

SOIs String, String Array
SOIs Object
SOIs Array Object

for every field value:
    CONDITION --> STRING, STRING ARRAY, OBJECT, OBJECT ARRAY

IF STRING --> SOIs String, String Array



## WC VERSION

for every SOI:
    find the content based on "field" and "content" and update 
    "skills", "1"

companyName = string
skills = string[]