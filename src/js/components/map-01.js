import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world";

const map01 = () => {
  const mapSelectorOne = document.querySelectorAll("#mapOne");

  if (mapSelectorOne.length) {
    const mapOne = new jsVectorMap({
      selector: "#mapOne",
      map: "world",
      zoomButtons: true, // Enable zoom for better interaction
      zoomOnScroll: true,
      focusOn: {
        region: "KE",
        scale: 20, // Zoom level to show Kenya details
        animate: true,
      },

      regionStyle: {
        initial: {
          fontFamily: "Outfit",
          fill: "#D9D9D9",
        },
        hover: {
          fillOpacity: 1,
          fill: "#465fff",
        },
      },

      markers: [
        { name: "Kiambu", coords: [-1.1714, 36.8356] },
        { name: "Murang'a", coords: [-0.7839, 37.04] },
        { name: "Nyandarua (Ol Kalou)", coords: [-0.2731, 36.3783] },
        { name: "Machakos", coords: [-1.5186, 37.2634] },
        { name: "Thika", coords: [-1.0388, 37.0837] },
      ],

      markerStyle: {
        initial: {
          strokeWidth: 1,
          fill: "#465fff",
          fillOpacity: 1,
          r: 6, // Larger for visibility
        },
        hover: {
          fill: "#465fff",
          fillOpacity: 1,
        },
      },

      onRegionTooltipShow: function (tooltip, code) {
        if (code === "KE") {
          tooltip.selector.innerHTML = "Kenya";
        }
      },
    });
  }
};

export default map01;
