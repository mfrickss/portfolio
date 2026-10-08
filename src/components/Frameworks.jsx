import { assetUrl } from "../lib/assets";
import { OrbitingCircles } from "./OrbitingCircles";

const OUTER_SKILLS = [
  { name: "python", file: "assets/logos/python.svg" },
  { name: "fastapi", file: "assets/logos/fastapi.svg" },
  { name: "django", file: "assets/logos/django.svg" },
  { name: "nestjs", file: "assets/logos/Nest.js.png" },
  { name: "dotnet", file: "assets/logos/dotnetcore-original-logo.svg" },
  { name: "postgresql", file: "assets/logos/postgresql.svg" },
  { name: "mysql", file: "assets/logos/mysql.svg" },
  { name: "docker", file: "assets/logos/docker.svg" },
  { name: "n8n", file: "assets/logos/n8n.svg" },
  { name: "selenium", file: "assets/logos/selenium.svg" },
  { name: "csharp", file: "assets/logos/csharp-plain-logo.svg" },
];

const INNER_SKILLS = [
  { name: "react", file: "assets/logos/react.svg" },
  { name: "nextjs", file: "assets/logos/nextjs.svg" },
  { name: "nodejs", file: "assets/logos/nodejs.svg" },
  { name: "typescript", file: "assets/logos/typescript.svg" },
  { name: "tailwind", file: "assets/logos/tailwind.svg" },
  { name: "vitejs", file: "assets/logos/vitejs.svg" },
  { name: "threejs", file: "assets/logos/threejs.svg" },
];

export function Frameworks() {
  return (
    <div className="relative flex h-[15rem] w-[15rem] flex-col items-center justify-center">
      <OrbitingCircles path={false} iconSize={34} radius={145} duration={40}>
        {OUTER_SKILLS.map((item) => (
          <Icon key={item.name} src={item.file} alt={item.name} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles path={false} iconSize={28} radius={85} reverse duration={28}>
        {INNER_SKILLS.map((item) => (
          <Icon key={item.name} src={item.file} alt={item.name} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

function Icon({ src, alt }) {
  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="size-full object-contain duration-200 hover:scale-125 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
    />
  );
}
