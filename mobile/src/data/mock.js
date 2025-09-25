export const riderSuggestions = [
  { id:"me",    name:"You",   vehicle:"Car", seats:2, rating:5.0, detourPct:5, time:"8:30 AM", price:5500, avatar:"https://i.pravatar.cc/150?img=5",  reliability:100, route:"Your Route",  vehicleType:"car", active:false },
  { id:"r1",    name:"Ahsan", vehicle:"Car", seats:2, rating:4.8, detourPct:5, time:"8:30 AM", price:5500, avatar:"https://i.pravatar.cc/150?img=12", reliability:97, route:"DHA → I.I. Chundrigar", vehicleType:"car", active:true },
  { id:"r2",    name:"Hiba",  vehicle:"Bike",seats:1, rating:4.9, detourPct:3, time:"8:15 AM", price:3200, avatar:"https://i.pravatar.cc/150?img=47", reliability:99, route:"Gulshan → Saddar",     vehicleType:"bike", active:false },
  { id:"r3",    name:"Faisal",vehicle:"Car", seats:3, rating:4.7, detourPct:8, time:"9:00 AM", price:6000, avatar:"https://i.pravatar.cc/150?img=22", reliability:92, route:"Nazimabad → Clifton", vehicleType:"car", active:true },
];
export const walletHistory = [
  { id:"w1", type:"Payment",   when:"Sep 01", amount:-5500, ref:"#JC9281" },
  { id:"w2", type:"Refund",    when:"Aug 15", amount:+1000, ref:"#RF2810" },
  { id:"w3", type:"Top-up",    when:"Aug 01", amount:+6000, ref:"#TP8821" },
];
export const chats = [
  { id:"c1", name:"Ahsan", last:"See you at 8:25", avatar:"https://i.pravatar.cc/150?img=12" },
  { id:"c2", name:"Hiba",  last:"Counter sent",    avatar:"https://i.pravatar.cc/150?img=47" },
];
export const messages = {
  c1: [
    { id:"m1", me:false, text:"Hi! confirm pickup at Gate 3?", at:"8:01 AM" },
    { id:"m2", me:true,  text:"Done, see you 8:25",            at:"8:02 AM" },
  ],
  c2: [
    { id:"m3", me:false, text:"I can do 3200", at:"10:22 AM" },
    { id:"m4", me:true,  text:"Ok 👍",        at:"10:23 AM" },
  ],
};
