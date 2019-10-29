using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SimpleRotator: MonoBehaviour
{
    [SerializeField] Vector3 speed;

    // Update is called once per frame
    void Update()
    {
        transform.Rotate(eulers: speed * Time.deltaTime);
    }
}
