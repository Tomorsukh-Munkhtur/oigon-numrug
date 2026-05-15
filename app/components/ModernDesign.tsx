"use client";

export default function ModernDesign() {
  return (
    <div className="modern-design-container">
      {/* Background decorative elements */}
      <div className="modern-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Main content */}
      <div className="modern-design-content">
        <div className="design-grid">
          {/* Feature cards */}
          <div className="feature-card card-gradient-1">
            <div className="card-icon">🏢</div>
            <h3>Орон сууц</h3>
            <p>Орлогын үл хөдлөх хөрөнгө</p>
          </div>

          <div className="feature-card card-gradient-2">
            <div className="card-icon">🏢</div>
            <h3>Оффис</h3>
            <p>Ажлын байрын орон</p>
          </div>

          <div className="feature-card card-gradient-3">
            <div className="card-icon">🌳</div>
            <h3>Хотхон</h3>
            <p>Зайлалтын үл хөдлөхтэй</p>
          </div>

          <div className="feature-card card-gradient-4">
            <div className="card-icon">💰</div>
            <h3>Хөрөнгө оруулалт</h3>
            <p>Өгөөжийн сайн боломж</p>
          </div>
        </div>

        {/* Stats visualization */}
        <div className="modern-stats">
          <div className="stat-bar">
            <div className="stat-fill fill-1" style={{ width: "85%" }}></div>
            <span>Сатсай харилцагч</span>
          </div>
          <div className="stat-bar">
            <div className="stat-fill fill-2" style={{ width: "90%" }}></div>
            <span>Төслийн амжилт</span>
          </div>
          <div className="stat-bar">
            <div className="stat-fill fill-3" style={{ width: "95%" }}></div>
            <span>Үйлчилгээний сэвэг</span>
          </div>
        </div>
      </div>
    </div>
  );
}
