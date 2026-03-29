-- 1. 课程表
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  icon text not null default '📚',
  color text not null default 'from-gray-500 to-gray-600',
  tagline text not null default '',
  hero_title text not null default '',
  hero_desc text not null default '',
  target_user text not null default '',
  cta text not null default '立即报名',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. 课程价格表
create table if not exists course_prices (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references courses(id) on delete cascade,
  name text not null,
  price text not null,
  description text not null default '',
  sort_order int not null default 0
);

-- 3. 课程特点表
create table if not exists course_features (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  description text not null default '',
  icon text not null default '✅',
  sort_order int not null default 0
);

-- 4. 课程交付物表
create table if not exists course_deliverables (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references courses(id) on delete cascade,
  content text not null,
  sort_order int not null default 0
);

-- 5. 导师表
create table if not exists instructors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  title text not null default '',
  bio text not null default '',
  avatar_url text not null default '',
  specialties text[] not null default '{}',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. 首页配置表（key-value 结构）
create table if not exists homepage_config (
  id uuid default gen_random_uuid() primary key,
  config_key text unique not null,
  config_value text not null default '',
  description text not null default '',
  updated_at timestamptz default now()
);

-- 7. 成功案例表
create table if not exists cases (
  id uuid default gen_random_uuid() primary key,
  emoji text not null default '🏆',
  title text not null,
  metric text not null,
  description text not null default '',
  tag text not null default '',
  color text not null default 'from-gray-500 to-gray-600',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS 策略：管理员角色可以读写所有表
alter table courses enable row level security;
alter table course_prices enable row level security;
alter table course_features enable row level security;
alter table course_deliverables enable row level security;
alter table instructors enable row level security;
alter table homepage_config enable row level security;
alter table cases enable row level security;

-- 公开读取策略（前台展示用）
create policy "Public read courses" on courses for select using (is_published = true);
create policy "Public read instructors" on instructors for select using (is_published = true);
create policy "Public read homepage_config" on homepage_config for select using (true);
create policy "Public read cases" on cases for select using (is_published = true);
create policy "Public read course_prices" on course_prices for select using (true);
create policy "Public read course_features" on course_features for select using (true);
create policy "Public read course_deliverables" on course_deliverables for select using (true);

-- 管理员写入策略（认证用户可以写）
create policy "Auth users can insert courses" on courses for insert to authenticated with check (true);
create policy "Auth users can update courses" on courses for update to authenticated using (true);
create policy "Auth users can delete courses" on courses for delete to authenticated using (true);
create policy "Auth users can manage course_prices" on course_prices for all to authenticated using (true);
create policy "Auth users can manage course_features" on course_features for all to authenticated using (true);
create policy "Auth users can manage course_deliverables" on course_deliverables for all to authenticated using (true);
create policy "Auth users can manage instructors" on instructors for all to authenticated using (true);
create policy "Auth users can manage homepage_config" on homepage_config for all to authenticated using (true);
create policy "Auth users can manage cases" on cases for all to authenticated using (true);

-- 插入首页默认配置
insert into homepage_config (config_key, config_value, description) values
('hero_title_line1', '一人干掉一个团队', '首页大标题第一行'),
('hero_title_line2', '用AI把人力成本砍掉80%', '首页大标题第二行'),
('hero_subtitle', '温州老板50人→30人，跨境电商GMV提升87%。我们来算给你看。', '首页副标题'),
('hero_badge_text', '🔥 全自动化AI交付 · 立即体验', '首页顶部badge文字'),
('hero_cta_primary', '免费领取案例报告', '主CTA按钮文字'),
('hero_cta_secondary', '199元 · 立即开课', '次CTA按钮文字'),
('stat_1_value', '50→30人', '统计数字1'),
('stat_1_label', '温州案例节省人力', '统计标签1'),
('stat_2_value', '87%+', '统计数字2'),
('stat_2_label', '跨境GMV平均提升', '统计标签2'),
('stat_3_value', '¥98,000', '统计数字3'),
('stat_3_label', '企业年度陪跑', '统计标签3'),
('stat_4_value', '¥199元', '统计数字4'),
('stat_4_label', '录播引流课入门', '统计标签4'),
('footer_tagline', '跨境电商老板 & 中小工作室首选 · 不卖焦虑只卖结果', '底部小字')
on conflict (config_key) do nothing;
