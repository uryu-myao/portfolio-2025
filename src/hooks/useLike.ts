import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useLike = () => {
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [userLikes, setUserLikes] = useState<number | null>(null);
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);

      // 获取总点赞数
      const { data: allData } = await supabase.from('likes').select('count');
      if (allData) {
        const total = allData.reduce((sum, item) => sum + item.count, 0);
        setLikeCount(total);
      }

      // 当前 IP 的点赞记录
      const { data: userData } = await supabase
        .from('likes')
        .select('*')
        .eq('ip', ip.trim())
        .single();

      if (userData) {
        setUserLikes(userData.count);
      } else {
        setUserLikes(0);
      }

      // 获取上一位访客（排除自己）
      const { data: recentVisitors } = await supabase
        .from('likes')
        .select('location, updated_at')
        .neq('ip', ip)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (recentVisitors && recentVisitors.length > 0) {
        const loc = recentVisitors[0].location;
        const [city, country] = loc.split(', ');
        setLastVisitor({ city, country });
      }

      setIsLoading(false);
    };

    fetchData();
  }, [ip]);

  const handleLike = async () => {
    if (!ip || userLikes === null || userLikes >= MAX_LIKES) return;

    const newCount = userLikes + 1;
    const { error } = await supabase.from('likes').upsert({
      ip,
      location,
      count: newCount,
      updated_at: new Date().toISOString(),
    });

    if (!error) {
      setUserLikes(newCount);
      setLikeCount((prev) => (prev !== null ? prev + 1 : newCount));
    }
  };

  return {
    likeCount,
    userLikes,
    handleLike,
    hasReachedLimit: userLikes !== null && userLikes >= MAX_LIKES,
    lastVisitor,
    isLoading,
  };
};
