
interface HTMLRendererProps {
  htmlContent: string;
}

export function HTMLRenderer({ htmlContent }: HTMLRendererProps): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
