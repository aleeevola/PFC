package pfc.WebAPI.Infraestructura.Entidades.Enumerables;

import java.util.HashMap;
import java.util.Map;

public enum Color {
	COLOR(1),ESCALA_DE_GRISES(2);
	
	private final int value;
	private static Map map = new HashMap<>();

	private Color(int value) {
	    this.value = value;
	}

	static {
	    for (Color color : Color.values()) {
	        map.put(color.value, color);
	    }
	}

	public static Color valueOf(int color) {
	    return (Color) map.get(color);
	}

	public int getValue() {
	    return value;
	}
}
