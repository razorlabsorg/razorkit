import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

type PageMetaProps = {
  description?: string;
  image?: string;
  pathname?: string;
  title?: string;
  url?: string;
  color?: string;
}

const PageMeta: React.FC<PageMetaProps> = ({
  color = 'white',
  description,
  image,
  pathname,
  title = 'Razor Kit',
  url = 'https://kit.razorwallet.xyz'
}: PageMetaProps) => {
  const router = useLocation();
  const imageUrl = `${url}/social/${image || 'default.png'}`;
  const path = pathname || router.pathname;

  return (
    <Helmet>
      <title>{title}</title>

      <meta content={description || 'The ultimate wallet connection kit for movement apps'} name="description" />
      <meta content={`${url}${path}`} property="og:url" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={imageUrl} property="og:image" />

      <meta content="@razordao" name="twitter:site" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={imageUrl} name="twitter:image" />

      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

      <meta content={color} name="theme-color" />

    </Helmet>
  )
}

export default PageMeta