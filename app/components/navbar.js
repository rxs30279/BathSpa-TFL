import Link from "next/link";
export default function Navbar() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="https://tfl.gov.uk/tube-dlr-overground/status/">Status</Link>
      <Link href="https://tfl.gov.uk/campaign/strikes">
        Industrial Disputes
      </Link>
    </div>
  );
}
