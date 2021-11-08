package pfc.WebAPI.Infraestructura.Entidades.Enumerables;

import java.util.HashMap;
import java.util.Map;

public enum MetodoDePago {
	EFECTIVO(1),MERCADO_PAGO(2);
	
	private final int value;
	private static Map map = new HashMap<>();

	private MetodoDePago(int value) {
	    this.value = value;
	}

	static {
	    for (MetodoDePago metodoDePago : MetodoDePago.values()) {
	        map.put(metodoDePago.value, metodoDePago);
	    }
	}

	public static MetodoDePago valueOf(int metodoDePago) {
	    return (MetodoDePago) map.get(metodoDePago);
	}

	public int getValue() {
	    return value;
	}
}
