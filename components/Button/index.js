import { Button } from "./styles.js";
import Link from "next/link";

function PrimitiveButton({ primary, children, ...props }) {
  return (
    <Button primary={primary} {...props}>
      {children}
    </Button>  
  )
}

export default function ButtonComponent({ link, primary, children, ...props }) {
  if (link) {
    return (
      <div>
        <Link href={link || ""}>
          <PrimitiveButton children={children} primary={primary} {...props} />
        </Link>
      </div>
    );
  }

  return (
    <PrimitiveButton children={children} primary={primary} {...props} />
  );
}
