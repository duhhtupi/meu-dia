/* Lembretes nativos no Android (plugin LocalNotifications do Capacitor).
   Funciona com o app fechado. Reagenda sozinho sempre que tarefas ou contas mudam. */
(function(){
  const C=window.Capacitor;
  if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
  const LN=C.Plugins&&C.Plugins.LocalNotifications;
  if(!LN)return;
  let last='',busy=false,asked=false;
  function build(){
    const now=new Date(),out=[];let id=1;
    S.tasks.forEach(t=>{
      if(t.done||!t.h)return;
      const [h,m]=t.h.split(':').map(Number);
      if(t.r){out.push({id:id++,title:'Meu Dia',body:t.t,schedule:{on:{hour:h,minute:m},allowWhileIdle:true}});return}
      const [y,mo,d]=t.d.split('-').map(Number),at=new Date(y,mo-1,d,h,m);
      if(at>now)out.push({id:id++,title:'Meu Dia',body:t.t,schedule:{at,allowWhileIdle:true}});
    });
    S.bills.forEach(b=>{
      if(!b.day)return;
      const mk=(y,mo)=>new Date(y,mo,Math.min(b.day,new Date(y,mo+1,0).getDate()),9,0);
      let due=mk(now.getFullYear(),now.getMonth());
      if(isPaid(b)||due<now)due=mk(now.getFullYear(),now.getMonth()+1);
      [1,0].forEach(o=>{
        const at=new Date(due.getTime()-o*864e5);
        if(at>now)out.push({id:id++,title:'Conta a pagar',body:b.name+(o?' vence amanhã':' vence hoje'),schedule:{at,allowWhileIdle:true}});
      });
    });
    return out;
  }
  async function plan(){
    if(busy)return;busy=true;
    try{
      if(!asked){asked=true;await LN.requestPermissions()}
      const p=await LN.getPending();
      if(p.notifications&&p.notifications.length)await LN.cancel({notifications:p.notifications});
      const list=build();
      if(list.length)await LN.schedule({notifications:list});
    }catch(e){}
    busy=false;
  }
  setInterval(()=>{let k;try{k=JSON.stringify([S.tasks,S.bills])}catch(e){return}if(k!==last){last=k;plan()}},4000);
})();
