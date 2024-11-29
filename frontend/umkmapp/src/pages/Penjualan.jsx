import { useState } from "react";
import "./css/Penjualan.css";

function Penjualan() {
  const [namaProduk, setNamaProduk] = useState("");
  const [status, setStatus] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="ps-3">MYUMKM</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <nav className="nav flex-column">
            <a className="nav-link active" aria-current="page" href="#">
              Dashboard
            </a>
            <a className="nav-link" href="#">
              Penjualan
            </a>
            <a className="nav-link" href="#">
              Pendapatan
            </a>
          </nav>
        </div>

        <div className="col-8">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@getbootstrap"
          >
            Tambah Produk
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    New message
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">
                        Recipient:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="recipient-name"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">
                        Message:
                      </label>
                      <textarea
                        class="form-control"
                        id="message-text"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Penjualan;
