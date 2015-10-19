using Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo.Controllers
{
    public class ProviderController : Controller
    {
        MyDbContext db = new MyDbContext();
        // GET: /Provider/
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllProviders()
        {

            var result = db.Providers.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        //get provider by id 
        public JsonResult GetProviderById(Provider EdtProvider)
        {
            var getId = db.Providers.Find(EdtProvider.id);
            var data = db.Providers.Where(s => s.id == getId.id).Select(x => new { id = x.id, name = x.name, address = x.address, phone = x.phone }).FirstOrDefault();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        //add provider
        [HttpPost]
        public JsonResult AddProviders(string name, string address, string phone)
        {
            db.Providers.Add(new Provider
            {
                name = name,
                address = address,
                phone = phone
            });
            db.SaveChanges();
            var data = db.Providers.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        //edit provider
        [HttpPost]
        public JsonResult EditProvider(int _newProId, string _newProName,string _newProAddress,string _newProPhone)
        {
            var myobj= db.Providers.Find(_newProId);
            if (myobj != null)
            {
                myobj.id = _newProId;
                myobj.name = _newProName;
                myobj.address = _newProAddress;
                myobj.phone = _newProPhone;
                db.Entry(myobj).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return Json(myobj,JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(JsonRequestBehavior.DenyGet);
            }
        }
        //del provider
        [HttpPost]
        public JsonResult DelProviders(Provider _delpro)
        {

            var delitems = db.Providers.Find(_delpro.id);
            db.Providers.Remove(delitems);
            db.SaveChanges();
            var result = db.Providers.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}