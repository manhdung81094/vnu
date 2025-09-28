﻿using Dapper;
using System.Reflection;
using Model.Base;
using System.Data;
using Newtonsoft.Json.Linq;

namespace Repository.Helper
{
    public class DynamicParameterHelper
    {
        public static void AddModifyInsertParameters(DynamicParameters param, modify_infor obj)
        {
            param.Add("is_deleted", obj.is_deleted);
            param.Add("created_user_id", obj.created_user_id);
            param.Add("created_time", obj.created_time);
            param.Add("last_modified_user_id", obj.last_modified_user_id);
            param.Add("last_modified_times", obj.last_modified_times);
        }
        public static void AddModifyUpdateParameters(DynamicParameters param, modify_infor obj)
        {
            param.Add("last_modified_user_id", obj.last_modified_user_id);
            param.Add("last_modified_times", obj.last_modified_times);
        }
        /// <summary>
        /// Convert object về danh sách các parameter để truyền vào storedprocedure
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static DynamicParameters ConvertAll(object obj)
        {
            var type = obj.GetType();
            var param = new DynamicParameters();
            var props = (IList<PropertyInfo>)type.GetProperties();
            foreach (var prop in props)
            {
                param.Add("@" + prop.Name, prop.GetValue(obj));
            }
            return param;
        }
        /// <summary>
        /// Convert object về danh sách các parameter để truyền vào storedprocedure - ngoại trừ các propery trong tham số withOutParams. Các param ngăn cách bằng dấu ","
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static DynamicParameters ConvertWithOutParams(object obj, string withOutParams)
        {
            var insertParamNames = withOutParams.Split(',');
            var type = obj.GetType();
            var param = new DynamicParameters();
            var props = (IList<PropertyInfo>)type.GetProperties();
            foreach (var prop in props)
            {
                if (!insertParamNames.Contains(prop.Name))
                {
                    param.Add("@" + prop.Name, prop.GetValue(obj));
                }
            }
            return param;
        }
        public static DynamicParameters ConvertWithOutCreatitonParams(object obj, string withOutParams = "is_deleted,created_time,created_user_id")
        {
            return ConvertWithOutParams(obj, withOutParams);
        }
        /// <summary>
        /// Convert object về danh sách các parameter để truyền vào storedprocedure, trong đó add param returnField là giá trị trả về
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="returnField"></param>
        /// <returns></returns>
        public static DynamicParameters ConvertWithReturnParam(object obj, string returnField = "ID", string withoutParams = null)
        {
            var type = obj.GetType();
            var param = new DynamicParameters();
            var props = (IList<PropertyInfo>)type.GetProperties();
            var withoutParamNames = withoutParams?.Split(',').ToList() ?? new List<string>();

            foreach (var prop in props.Where(x => !withoutParamNames.Contains(x.Name)))
            {
                var value = prop.GetValue(obj);
                if (prop.PropertyType == typeof(DateTime) || prop.PropertyType == typeof(DateTime?)) // <- Sửa ở đây
                {
                    param.Add("@" + prop.Name, value, DbType.DateTime);
                }
                else if (prop.Name == returnField)
                {
                    param.Add("@" + prop.Name, null, System.Data.DbType.Int64, System.Data.ParameterDirection.ReturnValue);
                }
                else
                {
                    param.Add("@" + prop.Name, value);
                }
            }
            return param;
        }
    }
}

