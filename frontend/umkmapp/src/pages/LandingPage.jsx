import React, { useEffect } from "react";
import card1 from "../assets/image-3.png";
import "./css/LandingPage.css";
import "../App.css";

const LandingPage = () => {
  useEffect(() => {
    // Menambahkan kelas khusus untuk landing page
    document.body.classList.add("landing-page");

    // Membersihkan kelas setelah komponen unmount
    return () => {
      document.body.classList.remove("landing-page");
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#myumkm">
            My UMKM
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                My UMKM Sidebar
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body mt-4">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-5">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#myumkm">
                    Beranda
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#tentang">
                    Tentang Kami
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#fitur">
                    Fitur
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#kontak">
                    Hubungi Kami
                  </a>
                </li>
              </ul>
              <div className="masuk">
                <a href="/login" className="btn btn-outline-primary mb-4 me-4">
                  Log In
                </a>
                <a href="/signup" className="btn btn-primary mb-4">
                  Daftar
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero bg-light py-5 d-flex flex-column flex-md-row align-items-center"
        id="myumkm"
      >
        <div className="hero-content text-center text-md-start">
          <h1 className="display-4 fw-bold pt-5">My UMKM</h1>
          <p className="lead py-4">
            Platform terbaik untuk para pelaku UMKM. Dari pengelolaan lapak,
            edukasi bisnis, hingga artikel inspiratif, semuanya kami hadirkan
            untuk mendukung usaha Anda.
          </p>
          <a href="/signup" className="btn btn-primary btn-xl mb-5">
            Daftar My UMKM
          </a>
        </div>
        <div className="hero-image bg-secondary rounded">
          <img
            src={card1}
            alt="Tentang Kami"
            className="img-fluid rounded shadow"
          />
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section className="about py-5" id="tentang">
        <div className="container-fluid d-flex flex-wrap align-items-center">
          <div className="about-image col-12 col-md-6 text-center pt-5">
            <img
              src={card1}
              alt="Tentang Kami"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="about-text col-12 col-md-6">
            <h2 className="fw-bold mb-4">Tentang Kami</h2>
            <p className="text-muted">
              My UMKM adalah platform digital yang mendukung pelaku Usaha Mikro,
              Kecil, dan Menengah (UMKM) di Indonesia untuk tumbuh dan
              berkembang.
            </p>
            <p className="text-muted">
              Dengan layanan kami, Anda dapat memperluas jaringan, meningkatkan
              visibilitas produk, dan mengelola bisnis dengan lebih baik.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5" id="fitur">
        <div className="container-fluid">
          <h2 className="fw-bold text-center mb-4 pt-5">
            Kenapa Memilih Kami?
          </h2>
          <div className="row py-5 d-flex gap-5">
            <div className="col">
              <div className="card h-100">
                <img src={card1} className="card-img-top" alt="card1" />
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold fs-3 pb-5">
                    Lapak Digital
                  </h5>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Lebih lengkap
                  </button>
                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog ">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Lapak Digital
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Kelola produk dan layanan Anda secara online dengan
                          mudah, praktis, dan efisien melalui platform kami yang
                          dirancang khusus untuk memenuhi kebutuhan bisnis Anda.
                          Dengan fitur pengelolaan yang lengkap, Anda dapat
                          menambahkan, mengedit, dan menghapus produk serta
                          layanan dengan beberapa klik saja. Platform kami
                          memungkinkan Anda untuk mengatur harga, stok,
                          deskripsi, dan kategori produk dengan mudah, serta
                          menawarkan pengelompokan yang lebih baik untuk
                          memudahkan pencarian oleh pelanggan. Selain itu, Anda
                          dapat memantau ketersediaan produk secara real-time,
                          sehingga memastikan Anda selalu siap untuk memenuhi
                          permintaan pelanggan. Dapatkan kontrol penuh atas
                          operasional bisnis Anda dan tingkatkan efisiensi
                          manajemen produk dengan solusi online yang kami
                          sediakan.
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src={card1} className="card-img-top" alt="card1" />
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold fs-3 pb-5">
                    Pengelolaan Pesanan
                  </h5>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Lebih lengkap
                  </button>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog ">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Pengelolaan Pesanan
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Kelola pesanan pelanggan Anda dengan sistem yang
                          mudah, efisien, dan terorganisir dengan baik. Dengan
                          platform kami, Anda dapat memproses pesanan dengan
                          cepat, melacak status setiap pesanan secara real-time,
                          dan memastikan pengiriman tepat waktu. Sistem kami
                          dirancang untuk mempermudah Anda dalam mengelola
                          berbagai jenis pesanan, dari yang paling sederhana
                          hingga yang paling kompleks, dengan antarmuka yang
                          ramah pengguna. Selain itu, Anda dapat mengatur dan
                          mengelompokkan pesanan berdasarkan berbagai kategori,
                          memastikan bahwa setiap pesanan ditangani dengan
                          prioritas yang sesuai. Tingkatkan kepuasan pelanggan
                          dan efisiensi operasional bisnis Anda dengan solusi
                          pengelolaan pesanan yang kami tawarkan.
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src={card1} className="card-img-top" alt="card1" />
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold fs-3 pb-5">
                    Analisis Penjualan
                  </h5>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Lebih lengkap
                  </button>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog ">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Analisis Penjualan
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Pantau perkembangan usaha Anda secara menyeluruh
                          melalui laporan penjualan yang lengkap, terstruktur,
                          dan akurat. Dengan laporan ini, Anda dapat memahami
                          performa bisnis Anda, mengidentifikasi produk yang
                          paling laris, serta menganalisis tren penjualan
                          berdasarkan waktu, lokasi, atau kategori produk. Data
                          yang disajikan dirancang untuk membantu Anda membuat
                          keputusan yang lebih baik, mengoptimalkan strategi
                          pemasaran, dan meningkatkan efisiensi operasional.
                          Pastikan bisnis Anda terus berkembang dengan informasi
                          yang relevan dan mudah diakses kapan saja.
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src={card1} className="card-img-top" alt="card1" />
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold fs-3 pb-5">
                    Promosi Produk
                  </h5>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Lebih lengkap
                  </button>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog ">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Promosi Produk
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Pasarkan produk Anda dengan lebih efektif dan jangkau
                          audiens yang lebih luas menggunakan fitur promosi
                          unggulan yang telah kami sediakan. Dengan berbagai
                          opsi promosi yang kami tawarkan, Anda dapat
                          meningkatkan visibilitas bisnis, menarik perhatian
                          pelanggan potensial, dan memaksimalkan penjualan
                          dengan cara yang lebih mudah dan efisien. Jadikan
                          bisnis Anda lebih dikenal di pasar dengan memanfaatkan
                          solusi promosi kami yang dirancang untuk mendukung
                          pertumbuhan usaha Anda secara berkelanjutan.
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-dark text-white">
        <div className="container bg-dark">
          <div className="row">
            {/* Kolom Kontak */}
            <div className="col-md-4 text-center text-md-start">
              <h5 className="fw-bold mb-3" id="kontak">
                Kontak Kami
              </h5>
              <p>
                <img src={card1} alt="Kontak" className="img-fluid mb-2" />
                <br />
                <strong>Alamat:</strong> Jalan Raya No.123, Jakarta, Indonesia
              </p>
              <p>
                <strong>Telepon:</strong> +62 123 456 789
              </p>
              <p>
                <strong>Email:</strong> info@myumkm.com
              </p>
            </div>

            {/* Kolom Media Sosial */}
            <div className="col-md-4 text-center">
              <h5 className="fw-bold mb-3">Ikuti Kami</h5>
              <div className="d-flex justify-content-center pb-3">
                <a
                  href="https://id-id.facebook.com/"
                  className="text-white me-3 text-decoration-none"
                >
                  <i className="bi bi-facebook fst-normal"> myumkm</i>
                </a>
                <a
                  href="https://x.com/"
                  className="text-white me-3 text-decoration-none"
                >
                  <i className="bi bi-twitter fst-normal"> myumkm</i>
                </a>
                <a
                  href="https://www.instagram.com/"
                  className="text-white text-decoration-none"
                >
                  <i className="bi bi-instagram fst-normal"> myumkm</i>
                </a>
              </div>
            </div>

            {/* Kolom Peta */}
            <div className="col-md-4 text-center text-md-start">
              <h5 className="fw-bold mb-3">Lokasi Kami</h5>
              <p>Temukan kami di peta berikut:</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2349416409384!2d107.59107227370993!3d-6.862422767137515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6b943c2c5ff%3A0xee36226510a79e76!2sUniversitas%20Pendidikan%20Indonesia!5e0!3m2!1sen!2sid!4v1734328292091!5m2!1sen!2sid"
                width="100%"
                height="200"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-4">
            <p className="mb-0">© 2024 My UMKM | Semua Hak Dilindungi</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
