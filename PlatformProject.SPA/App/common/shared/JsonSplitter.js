/**
 * User: nalinK
*/


function JsonSplitter()
{

    return {

        getStringValueForParent: function (jsonObject, parentKey, subKey)
        {

            var childJsonObject = jsonObject.get(parentKey);
            var stringVal = this.getStringValue(childJsonObject, subKey);

            return stringVal;
        },
        getArrayForParent: function (jsonObject, parentKey, subKey)
        {

            var childJsonObject = jsonObject.get(parentKey);
            var jsonArray = this.getArray(childJsonObject, subKey);

            return jsonArray;
        },
        getArray: function (jsonObject, key)
        {

            var jsonArray = jsonObject.get(key);

            return jsonArray;
        },
        getStringValue: function (jsonObject, key)
        {

            var stringVal = jsonObject.get(key);

            return stringVal;
        }
    }
}