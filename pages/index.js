import Head from "next/head";

export default () => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>NMagick - Next Image Magick API</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
            </Head>
            <div className="container">
                <div className="text-center">
                    <img src="https://imagemagick.org/image/wizard.jpg" className="img-fluid mx-auto" />
                </div>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="card">
                            <div className="card-title text-center h4 p-1 bg-light">
                                Next imagemagick
                            </div>
                            <div className="card-body">
                                <div className="text-center">
                                    Image handling system Via API in Next-js.
                                </div>
                                <ul className="pt-3">
                                    <li>
                                        <a href="">Documentation</a>
                                    </li>
                                    <li>
                                        <a href="">Github</a>
                                    </li>
                                    <li>
                                        <a href="">API</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="p-3 fixed-bottom d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        NMagick
                    </a>
                    <span class="mb-3 mb-md-0 text-muted">© 2022 Ratts, Victor</span>
                </div>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}