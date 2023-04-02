import { AppConfig } from '../../utils/AppConfig';

const FooterCopyright = () => (
    <div className="footer-copyright">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Developed by{' '}
        <span role="img" aria-label="Love">
            ♥
        </span>{' '}
        by <a href="https://www.linkedin.com/in/elwin-chiong-3602b5222/">Elwin Chiong, Malaysia</a>
        <style jsx>
            {`
                .footer-copyright :global(a) {
                    @apply text-primary-500;
                }

                .footer-copyright :global(a:hover) {
                    @apply underline;
                }
            `}
        </style>
    </div>
);

export { FooterCopyright };
