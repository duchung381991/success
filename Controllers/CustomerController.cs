using Demo.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo.Controllers
{
    public class CustomerController : Controller
    {

        //
        public MyDbContext db = new MyDbContext();
        // GET: /Customer/
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllCustomer()
        {
            var db = new MyDbContext();
            var result = db.Customers.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult AddCustomer(string _addname, string _addaddress, string _addphone)
        {
            var db = new MyDbContext();
            db.Customers.Add(new Customer()
            {
                name = _addname,
                address = _addaddress,
                phone = _addphone
            });
            db.SaveChanges();
            var result = db.Customers.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        //get id cua khach hang
        [HttpPost]
        public JsonResult GetCustomerById(Customer ctmId)
        {
            var ids = db.Customers.Find(ctmId.id);// tao bien chua id
            var data = db.Customers.Where(g => g.id == ids.id).Select(x => new { id = x.id, name = x.name, phone = x.phone, address = x.address }).FirstOrDefault();//querry den bang chua id , lay thong tin id  
            return Json(data, JsonRequestBehavior.AllowGet);//tra ve doi tuong data 
        }
        // update thong tin theo id
        [HttpPost]
        public JsonResult EditCustomer(int _editId, string _editName, string _editAddress, string _editPhone)
        {

            var myCustomer = db.Customers.Find(_editId);
            if (myCustomer != null)
            {
                myCustomer.name = _editName;
                myCustomer.address = _editAddress;
                myCustomer.phone = _editPhone;
                db.Entry(myCustomer).State = EntityState.Modified;
                db.SaveChanges();
                return Json(myCustomer, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(JsonRequestBehavior.DenyGet);
            }
        }
        // del customer
        [HttpPost]
        public JsonResult DelCustomer(Customer _delCustomer)
        {
            var db = new MyDbContext();
            var delcustomer = db.Customers.Find(_delCustomer.id);
            db.Customers.Remove(delcustomer);
            db.SaveChanges();
            var result = db.Customers.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}