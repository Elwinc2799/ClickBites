import { AppConfig } from '@/components/utils/AppConfig';

const FooterCopyright = () => (
    <div className="footer-copyright">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Developed by{' '}
        <span role="img" aria-label="Love">
            ♥
        </span>{' '}
        by{' '}
        <a href="https://www.linkedin.com/in/elwin-chiong-3602b5222/">
            Elwin Chiong, Malaysia
        </a>
        <style jsx>
            {`
                .footer-copyright :global(a) {
                    --tw-text-opacity: 1;
                    color: rgb(3 169 244 / var(--tw-text-opacity));
                }

                .footer-copyright :global(a:hover) {
                    text-decoration-line: underline;
                }
            `}
        </style>
    </div>
);

export { FooterCopyright };
