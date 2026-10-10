import { getCollection, type CollectionEntry } from 'astro:content';
import { sponsorPlans } from '~/data/2027/sponsorPlans';

type Ordered = { id: string; data: { order: number } };

// order の昇順、同じ値ならファイル名（id）順
export const byOrder = (a: Ordered, b: Ordered): number =>
  a.data.order - b.data.order || a.id.localeCompare(b.id);

export const getKeynotes = async () => (await getCollection('keynotes2027')).sort(byOrder);

export const getEvents = async () => (await getCollection('events2027')).sort(byOrder);

export const getSponsors = async () => (await getCollection('sponsors2027')).sort(byOrder);

// プランの定義順にまとめ、スポンサーがいないプランは除く
export const groupByPlan = (sponsors: CollectionEntry<'sponsors2027'>[]) =>
  sponsorPlans
    .map((plan) => ({ plan, sponsors: sponsors.filter((s) => s.data.plan === plan.id) }))
    .filter((group) => group.sponsors.length > 0);
