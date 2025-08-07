import { redirect, RedirectType } from 'next/navigation'


export default function IndexPage() {
  redirect('/dashboard', RedirectType.replace)
}