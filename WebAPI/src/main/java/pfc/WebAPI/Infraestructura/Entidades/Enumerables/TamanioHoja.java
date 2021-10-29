package pfc.WebAPI.Infraestructura.Entidades.Enumerables;

import java.util.HashMap;
import java.util.Map;

public enum TamanioHoja {
	A1(1),A2(2),A3(3),A4(4),OTRO(5);
	
	private final int value;
	private static Map map = new HashMap<>();

	private TamanioHoja(int value) {
	    this.value = value;
	}

	static {
	    for (TamanioHoja tamanio : TamanioHoja.values()) {
	        map.put(tamanio.value, tamanio);
	    }
	}

	public static TamanioHoja valueOf(int tamanio) {
	    return (TamanioHoja) map.get(tamanio);
	}

	public int getValue() {
	    return value;
	}
}
