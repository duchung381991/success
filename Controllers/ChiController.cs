using Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System.Security.Claims;
using System.Data.Entity;

namespace Demo.Controllers
{
    public class ChiController : Controller
    {
       
        MyDbContext db = new MyDbContext();
        
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetPhieuChi()
        {

            var result = db.Lists.Where(s => s.status == 1).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        //get phieu chi by id 
        [HttpPost]
        public JsonResult GetPhieuChiById(List objchi) 
        { 
        var ids = db.Lists.Find(objchi.id);
        var data = db.Lists.Where(s=>s.id == ids.id).Select(x=>new{id = x.id,name = x.name, date = x.date,creator= x.creator,target=x.target,money = x.money,notes=x.notes}).FirstOrDefault();
        return Json(data, JsonRequestBehavior.AllowGet);
        }
        //edit phieu chi
        [HttpPost]
        public JsonResult UpdatePhieuchi(int id, string name, string date, string creator, string target, string money, string notes)
        {
            var myObj = db.Lists.Find(id);
            if (myObj != null)
            {
                myObj.name = name;
                myObj.date = date;
                myObj.creator = creator;
                myObj.target = target;
                myObj.money = money;
                myObj.notes = notes;
                db.Entry(myObj).State = EntityState.Modified;
                db.SaveChanges();
                return Json(myObj, JsonRequestBehavior.AllowGet);
            }
            else {

                return Json(JsonRequestBehavior.DenyGet);
            }
        }
        //add phieu chi
        [HttpPost]
        public JsonResult AddPhieuchi(string _Name, string _Creator, string _Time, string _Notes, string _Target, string _Money)
        {
            db.Lists.Add(new List
            {
                status = 1,
                name = _Name,
                date = _Time,
                creator = _Creator,
                target = _Target,
                money = _Money,
                notes = _Notes
            });
            db.SaveChanges();
            var result = db.Lists.Where(s => s.status == 1).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        //del phieu chi
        [HttpPost]
        public JsonResult DelPhieuchi(List delchi)
        {
            var db = new MyDbContext();
            var deleteChi = db.Lists.Find(delchi.id);
            db.Lists.Remove(deleteChi);
            db.SaveChanges();
            var data = db.Lists.Where(s => s.status == 1).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }      
    }
}