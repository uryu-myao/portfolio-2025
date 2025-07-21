// src/hooks/useLike.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useLike = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [userLikes, setUserLikes] = useState(0);
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState('');
  const MAX_LIKES = 5;
  const [lastVisitor, setLastVisitor] = useState<{
    city: string;
    country: string;
  } | null>(null);

  // 获取访客 IP 和位置
  useEffect(() => {
    fetch('https://ipwho.is/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIp(data.ip);
          setLocation(`${data.city}, ${data.country}`);
        }
      });
  }, []);

  // 获取总点赞数 & 当前 IP 的点赞数
  useEffect(() => {
    if (!ip) return;

    const fetchData = async () => {
      // 获取总数
      const { data: allData, error: allError } = await supabase
        .from('likes')
        .select('count');

      if (allData) {
        const total = allData.reduce((sum, item) => sum + item.count, 0);
        setLikeCount(total);
      }

      // 获取当前 IP 的点赞记录
      const { data: userData } = await supabase
        .from('likes')
        .select('*')
        .eq('ip', ip)
        .single();

      if (userData) {
        setUserLikes(userData.count);
      }

      // 获取上一个访问者（排除自己），按时间倒序取一条
      const { data: recentVisitors } = await supabase
        .from('likes')
        .select('location, updated_at')
        .neq('ip', ip) // ❗ 排除当前访客
        .order('updated_at', { ascending: false })
        .limit(1);

      if (recentVisitors && recentVisitors.length > 0) {
        const loc = recentVisitors[0].location;
        const [city, country] = loc.split(', ');
        setLastVisitor({ city, country });
      }
    };

    fetchData();
  }, [ip]);

  const handleLike = async () => {
    if (!ip || userLikes >= MAX_LIKES) return;

    const newCount = userLikes + 1;
    const { error } = await supabase.from('likes').upsert({
      ip,
      location,
      count: newCount,
      updated_at: new Date().toISOString(),
    });

    if (!error) {
      setUserLikes(newCount);
      setLikeCount((prev) => prev + 1);
    }
  };

  return {
    likeCount,
    userLikes,
    handleLike,
    hasReachedLimit: userLikes >= MAX_LIKES,
    lastVisitor,
  };
};
