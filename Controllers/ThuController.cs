using Demo.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo.Controllers
{
   
    public class ThuController : Controller
    {
        MyDbContext db = new MyDbContext();
       
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetPhieuThu()
        {
            var result = db.Lists.Where(s => s.status == 2).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        //getphieuthu by id 
        [HttpPost]
        public JsonResult GetPhieuThuById(List objThu)
        {
            var idthu = db.Lists.Find(objThu.id);
            var data = db.Lists.Where(g=>g.id == idthu.id).Select(x => new { id = x.id, name = x.name, date = x.date, creator = x.creator, target = x.target, money = x.money, notes = x.notes }).FirstOrDefault();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdatePhieuThu(int id, string name, string date, string creator, string target, string money, string notes) 
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
            else{
                return Json(JsonRequestBehavior.DenyGet);
            }
        }
        [HttpPost]
        public JsonResult AddPhieuThu(string _Name, string _Creator, string _Time, string _Notes, string _Target, string _Money)
        {
            db.Lists.Add(new List()
            {
                status = 2,
                name = _Name,
                date = _Time,
                notes = _Notes,
                target = _Target,
                creator= _Creator,
                money = _Money
            });
            db.SaveChanges();
            var data = db.Lists.Where(s => s.status == 2).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);        
        }
        [HttpPost]
        public JsonResult DelPhieuThu(List delThu)
        {
            var thu = db.Lists.Find(delThu.id);
            db.Lists.Remove(thu);
            db.SaveChanges();
            var data = db.Lists.Where(s => s.status == 2).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
	}
}