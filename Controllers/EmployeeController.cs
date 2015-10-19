using Demo.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo.Controllers
{

    public class EmployeeController : Controller
    {
        MyDbContext db = new MyDbContext();
        // GET: /Employee/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllEmp()
        {

            var result = db.Employees.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult GetEmployeeById(Employee EmpId)
        {
            var idemp = db.Employees.Find(EmpId.id);
            var data = db.Employees.Where(g => g.id == idemp.id).Select(x => new { id = x.id, name = x.name, address = x.address, phone = x.phone }).FirstOrDefault();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddEmployee(string _addName, string _addAddress, string _addPhone)
        {

            db.Employees.Add(new Employee()
            {
                name = _addName,
                address = _addAddress,
                phone = _addPhone
            });
            db.SaveChanges();
            var data = db.Employees.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult EditEmployee(int id, string name, string address, string phone)
        {
            var empEdit = db.Employees.Find(id);
            if (empEdit != null)
            {
                empEdit.name = name;
                empEdit.phone = phone;
                empEdit.address = address;
                db.Entry(empEdit).State = EntityState.Modified;
                db.SaveChanges();
                return Json(empEdit, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(empEdit, JsonRequestBehavior.DenyGet);
            }

        }
        //del employee
        [HttpPost]
        public JsonResult delEmployee(Employee delEmploy)
        {

            var delemp = db.Employees.Find(delEmploy.id);
            db.Employees.Remove(delemp);
            db.SaveChanges();
            var result = db.Employees.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}