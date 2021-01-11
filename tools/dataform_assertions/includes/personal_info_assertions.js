/*
    Custom dataform assertions for personal informations
*/

/* 
This assertion checks whether the input email format is valid
*/
function test_email_validity(colName){
    var result_query = "REGEXP_CONTAINS(" + colName + ", r\"^[\\w.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$\")"
    return result_query
}

/*
    This assertion checks whether the input marital status is within an acceptable list 
*/
function test_marital_status(colName){
    var marital_list = "[\"Married\", \"Single\", \"Divorced\", \"Widowed\"]"
    var result_query = colName + 
    " IN(SELECT marriage_status from UNNEST(" + marital_list+ ") AS marriage_status)"
    return result_query
}

/*
    This assertion checks whether the input gender status is within an acceptable list
*/
function test_gender_status(colName){
    var gender_list = "[\"Female\",\"Male\",\"Transgender Female\",\"Transgender Male\",\"Gender Variant\",\"Prefer Not to Say\"]"
    var result_query = colName + 
    " IN(SELECT gender_status from UNNEST(" + gender_list + ") AS gender_status)"
    return result_query
}

/*
    This assertion checks whether the name is valid and only contain characters and numbers
*/
function test_name_validity(colName){
    var result_query = "REGEXP_CONTAINS(" + colName + ", r\"^[a-zA-Z0-9]+$\")"
    return result_query
}

/*
    This assertions compares with other input column to check whether the last name is unique
*/
function test_last_name_unique(colName1, colName2){
    var result_query = colName1 + " != " + colName2
    return result_query
}

/*
    The assertion checks that no name contain more than 3 repeated characters 
*/
function test_same_character_more_than_two_times(colName){
    var regex = "(aaa)+|(bbb)+|(ccc)+|(ddd)+|(eee)+|(fff)+|(ggg)+|(hhh)+|(iii)+|(jjj)+|(kkk)+|(lll)+|(mmm)+|" + 
    "(nnn)+|(ooo)+|(ppp)+|(qqq)+|(rrr)+|(sss)+|(ttt)+|(uuu)+|(vvv)+|(www)+|(xxx)+|(yyy)+|(zzz)+"
    var query_result = "NOT REGEXP_CONTAINS(" + colName + ", r'"+ regex + "')"
    return query_result
}

module.exports = {
    test_email_validity,
    test_marital_status,
    test_gender_status,
    test_name_validity,
    test_last_name_unique,
    test_same_character_more_than_two_times
}