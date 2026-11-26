-- Seeds iniciais — Cabana Pet Café

insert into public.services (id, name, slug, duration_min, base_price_cents, parallel, price_by_coat_size, featured)
values
  ('banho','Banho','banho',60,8500,true,
    '{"mini-curta":7500,"mini-media":8500,"mini-longa":9500,"mini-dupla":9500,"pequeno-curta":8500,"pequeno-media":9500,"pequeno-longa":10500,"pequeno-dupla":10500,"medio-curta":9500,"medio-media":10500,"medio-longa":12000,"medio-dupla":12500,"grande-curta":11000,"grande-media":12500,"grande-longa":14000,"grande-dupla":14500,"gigante-curta":13500,"gigante-media":15000,"gigante-longa":17000,"gigante-dupla":18000}'::jsonb,
    true),
  ('banho-tosa-higienica','Banho + Tosa higiênica','banho-tosa-higienica',90,11000,true,
    '{"mini-curta":10000,"mini-media":11000,"mini-longa":12000,"mini-dupla":12500,"pequeno-curta":11000,"pequeno-media":12000,"pequeno-longa":13500,"pequeno-dupla":13500,"medio-curta":12500,"medio-media":13500,"medio-longa":15500,"medio-dupla":16000,"grande-curta":14500,"grande-media":16000,"grande-longa":18000,"grande-dupla":18500,"gigante-curta":17500,"gigante-media":19500,"gigante-longa":22000,"gigante-dupla":23000}'::jsonb,
    true),
  ('banho-tosa-completa','Banho + Tosa completa','banho-tosa-completa',150,15500,false,
    '{"mini-curta":14000,"mini-media":15500,"mini-longa":17000,"mini-dupla":17500,"pequeno-curta":15500,"pequeno-media":17000,"pequeno-longa":19000,"pequeno-dupla":19500,"medio-curta":17500,"medio-media":19500,"medio-longa":21500,"medio-dupla":22500,"grande-curta":20000,"grande-media":22500,"grande-longa":25000,"grande-dupla":26000,"gigante-curta":25000,"gigante-media":28000,"gigante-longa":32000,"gigante-dupla":33500}'::jsonb,
    true),
  ('hidratacao','Hidratação (add-on)','hidratacao',30,4500,true,'{}'::jsonb,true),
  ('unhas','Corte de unhas','corte-unhas',15,0,true,'{}'::jsonb,true)
on conflict (id) do nothing;

insert into public.menu_items (name, slug, description, price_cents, category, featured, sort_order) values
  ('Espresso duplo','espresso-duplo','grão do dia, moagem fina',900,'cafe',true,10),
  ('Flat white','flat-white','leite texturizado com arte',1300,'cafe',true,20),
  ('V60','v60','filtro coado, 220ml',1500,'cafe',false,30),
  ('Croissant de amendoim','croissant-amendoim','receita da casa, massa de dois dias',1400,'comida',true,40),
  ('Tartine de abacate','tartine-abacate','pão de fermentação natural',2200,'comida',true,50),
  ('Petit-gâteau para pets','petit-pets','farinha de arroz, sem açúcar',1800,'pet',true,60),
  ('Sagu de uva','sagu-uva','sobremesa da infância, do jeito certo',1600,'sobremesa',true,70)
on conflict (slug) do nothing;

insert into public.settings (key, value) values
  ('work_hours', '{"start":"09:00","end":"18:00","days":[2,3,4,5,6]}'::jsonb),
  ('slot_minutes', '30'::jsonb),
  ('max_parallel', '2'::jsonb),
  ('buffer_minutes', '15'::jsonb)
on conflict (key) do update set value = excluded.value;
